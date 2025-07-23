package com.hanzama.mental_health_app.service.impl;

import com.hanzama.mental_health_app.domain.entity.ChatMessage;
import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.domain.enums.MessageSender;
import com.hanzama.mental_health_app.dto.ChatRequest;
import com.hanzama.mental_health_app.repository.ChatMessageRepository;
import com.hanzama.mental_health_app.service.ChatService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Implementasi dari ChatService yang menangani logika bisnis untuk interaksi AI.
 * Mengintegrasikan penyimpanan pesan dengan Google Gemini API untuk respons AI yang sesungguhnya.
 */
@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    /**
     * Mengirim pesan dari pengguna ke sistem AI dan menyimpan percakapan.
     * 
     * @param request data pesan yang dikirim pengguna
     * @param currentUser pengguna yang sedang login
     * @return ChatMessage respons dari AI
     */
    @Override
    @Transactional
    public ChatMessage sendMessage(ChatRequest request, User currentUser) {
        log.info("Memproses pesan dari pengguna: {} dengan panjang: {} karakter", 
                currentUser.getEmail(), request.getMessage().length());

        // Validasi input
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Pesan tidak boleh kosong");
        }

        // 1. Simpan pesan dari pengguna ke database
        ChatMessage userMessage = ChatMessage.builder()
                .message(request.getMessage().trim())
                .sender(MessageSender.USER)
                .user(currentUser)
                .build();

        ChatMessage savedUserMessage = chatMessageRepository.save(userMessage);
        log.info("Pesan pengguna berhasil disimpan dengan ID: {}", savedUserMessage.getId());

        // 2. Panggil Google Gemini API untuk mendapatkan respons AI
        String aiResponse = callGeminiAPI(request.getMessage());

        // 3. Simpan respons AI ke database
        ChatMessage aiMessage = ChatMessage.builder()
                .message(aiResponse)
                .sender(MessageSender.AI)
                .user(currentUser)
                .build();

        ChatMessage savedAiMessage = chatMessageRepository.save(aiMessage);
        log.info("Respons AI berhasil disimpan dengan ID: {}", savedAiMessage.getId());

        // 4. Kembalikan objek ChatMessage dari respons AI
        return savedAiMessage;
    }

    /**
     * Mengambil riwayat chat milik pengguna tertentu.
     * 
     * @param currentUser pengguna yang riwayat chatnya akan diambil
     * @return List ChatMessage yang diurutkan dari yang terbaru
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChatMessage> getChatHistory(User currentUser) {
        log.info("Mengambil riwayat chat untuk pengguna: {}", currentUser.getEmail());
        
        List<ChatMessage> chatHistory = chatMessageRepository.findByUserOrderByCreatedAtDesc(currentUser);
        
        log.info("Ditemukan {} pesan dalam riwayat chat pengguna: {}", 
                chatHistory.size(), currentUser.getEmail());
        
        return chatHistory;
    }

    /**
     * Memanggil Google Gemini API untuk mendapatkan respons AI.
     * 
     * @param userMessage pesan dari pengguna
     * @return respons dari AI
     */
    private String callGeminiAPI(String userMessage) {
        try {
            log.info("Mengirim request ke Google Gemini API");

            // 1. Bangun objek GeminiRequest
            GeminiRequest geminiRequest = buildGeminiRequest(userMessage);

            // 2. Siapkan HTTP Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 3. Buat HttpEntity
            HttpEntity<GeminiRequest> requestEntity = new HttpEntity<>(geminiRequest, headers);

            // 4. Panggil API Gemini dengan API Key sebagai parameter URL
            String urlWithApiKey = geminiApiUrl + "?key=" + geminiApiKey;
            
            ResponseEntity<GeminiResponse> response = restTemplate.postForEntity(
                    urlWithApiKey,
                    requestEntity,
                    GeminiResponse.class
            );

            // 5. Ekstrak respons
            String aiResponse = extractResponseText(response.getBody());
            
            log.info("Berhasil mendapat respons dari Gemini API dengan panjang: {} karakter", 
                    aiResponse.length());

            return aiResponse;

        } catch (HttpClientErrorException e) {
            log.error("Client error saat memanggil Gemini API. Status: {}, Body: {}", 
                    e.getStatusCode(), e.getResponseBodyAsString());
            return getFallbackResponse(userMessage);
            
        } catch (HttpServerErrorException e) {
            log.error("Server error saat memanggil Gemini API. Status: {}, Body: {}", 
                    e.getStatusCode(), e.getResponseBodyAsString());
            return getFallbackResponse(userMessage);
            
        } catch (Exception e) {
            log.error("Error tidak terduga saat memanggil Gemini API: {}", e.getMessage(), e);
            return getFallbackResponse(userMessage);
        }
    }

    /**
     * Membangun objek GeminiRequest dengan pesan pengguna.
     */
    private GeminiRequest buildGeminiRequest(String userMessage) {
        // Buat system prompt untuk konteks aplikasi kesehatan mental
        String systemPrompt = "Anda adalah AI assistant yang berperan sebagai konselor kesehatan mental yang empathetic dan profesional. " +
                "Berikan dukungan emosional yang appropriate, dengarkan dengan penuh perhatian, dan berikan saran coping strategies yang sehat. " +
                "Jangan berikan diagnosis medis dan gunakan bahasa Indonesia yang warm dan supportive. " +
                "Batasi respons maksimal 200 kata.";

        String fullMessage = systemPrompt + "\n\nUser: " + userMessage + "\n\nAI:";

        Part part = Part.builder()
                .text(fullMessage)
                .build();

        Content content = Content.builder()
                .parts(List.of(part))
                .build();

        return GeminiRequest.builder()
                .contents(List.of(content))
                .build();
    }

    /**
     * Mengekstrak teks respons dari objek GeminiResponse.
     */
    private String extractResponseText(GeminiResponse response) {
        if (response != null && 
            response.getCandidates() != null && 
            !response.getCandidates().isEmpty()) {
            
            Candidate firstCandidate = response.getCandidates().get(0);
            if (firstCandidate.getContent() != null && 
                firstCandidate.getContent().getParts() != null && 
                !firstCandidate.getContent().getParts().isEmpty()) {
                
                String text = firstCandidate.getContent().getParts().get(0).getText();
                return text != null ? text.trim() : getFallbackResponse("");
            }
        }
        
        log.warn("Respons Gemini tidak sesuai format yang diharapkan, menggunakan fallback");
        return getFallbackResponse("");
    }

    /**
     * Mendapatkan respons fallback jika Gemini API gagal.
     */
    private String getFallbackResponse(String userMessage) {
        String message = userMessage.toLowerCase();
        
        if (message.contains("sedih") || message.contains("depresi") || message.contains("down")) {
            return "Saya mengerti bahwa Anda sedang mengalami kesedihan. Perasaan ini normal dan valid. " +
                   "Apakah ada hal spesifik yang ingin Anda ceritakan? Saya di sini untuk mendengarkan.";
        } else if (message.contains("cemas") || message.contains("khawatir") || message.contains("takut")) {
            return "Kecemasan memang bisa sangat mengganggu. Cobalah untuk bernapas dalam-dalam. " +
                   "Apa yang sedang membuat Anda merasa cemas saat ini?";
        } else if (message.contains("marah") || message.contains("kesal") || message.contains("frustasi")) {
            return "Kemarahan adalah emosi yang wajar. Yang penting adalah bagaimana kita mengelolanya. " +
                   "Apakah Anda ingin berbicara tentang apa yang memicu perasaan ini?";
        } else if (message.contains("terima kasih") || message.contains("thanks")) {
            return "Sama-sama! Saya senang bisa membantu Anda. Jangan ragu untuk kembali berbicara " +
                   "kapan pun Anda membutuhkannya.";
        } else if (message.contains("halo") || message.contains("hai") || message.contains("hello")) {
            return "Halo! Selamat datang. Saya di sini untuk mendengarkan dan mendukung Anda. " +
                   "Ada yang ingin Anda ceritakan hari ini?";
        } else {
            return "Terima kasih telah berbagi cerita Anda. Saya menghargai kepercayaan yang Anda berikan. " +
                   "Apakah ada hal lain yang ingin Anda diskusikan atau tanyakan?";
        }
    }

    // ===== DTO Classes untuk Gemini API =====

    /**
     * DTO untuk request ke Google Gemini API
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GeminiRequest {
        private List<Content> contents;
    }

    /**
     * DTO untuk konten dalam request Gemini
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Content {
        private List<Part> parts;
    }

    /**
     * DTO untuk bagian teks dalam konten
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Part {
        private String text;
    }

    /**
     * DTO untuk response dari Google Gemini API
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GeminiResponse {
        private List<Candidate> candidates;
    }

    /**
     * DTO untuk kandidat respons dari Gemini
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Candidate {
        private Content content;
    }
}
