package com.hanzama.mental_health_app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service untuk integrasi dengan Google Gemini API.
 * Menangani komunikasi dengan layanan AI eksternal untuk menghasilkan respons
 * yang contextual dan empathetic untuk aplikasi kesehatan mental.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiService {

    private final RestTemplate restTemplate;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    /**
     * Mengirim pesan pengguna ke Google Gemini dan mendapatkan respons AI.
     * 
     * @param userMessage pesan dari pengguna
     * @return respons dari AI atau fallback message jika gagal
     */
    public String generateAIResponse(String userMessage) {
        try {
            log.info("Mengirim request ke Google Gemini API untuk pesan dengan panjang: {} karakter", 
                    userMessage.length());

            // Buat system prompt khusus untuk konteks aplikasi kesehatan mental
            String systemPrompt = createSystemPrompt();
            String fullPrompt = systemPrompt + "\n\nUser: " + userMessage + "\n\nAI:";

            // Buat request body sesuai format Gemini API
            Map<String, Object> requestBody = createGeminiRequestBody(fullPrompt);

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-goog-api-key", geminiApiKey);

            // Buat HTTP entity
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            // Kirim request ke Gemini API
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    geminiApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    (Class<Map<String, Object>>) (Class<?>) Map.class
            );

            // Parse respons
            String aiResponse = parseGeminiResponse(response.getBody());
            
            log.info("Berhasil mendapat respons dari Gemini API dengan panjang: {} karakter", 
                    aiResponse.length());

            return aiResponse;

        } catch (Exception e) {
            log.error("Gagal memanggil Gemini API: {}", e.getMessage(), e);
            return getFallbackResponse(userMessage);
        }
    }

    /**
     * Membuat system prompt yang sesuai untuk aplikasi kesehatan mental.
     */
    private String createSystemPrompt() {
        return "Anda adalah AI assistant yang berperan sebagai konselor kesehatan mental yang empathetic dan profesional. " +
               "Tugas Anda adalah:\n" +
               "1. Mendengarkan dengan penuh perhatian\n" +
               "2. Memberikan dukungan emosional yang appropriate\n" +
               "3. Menyarankan coping strategies yang sehat\n" +
               "4. Tidak memberikan diagnosis medis\n" +
               "5. Mendorong pengguna untuk mencari bantuan profesional jika diperlukan\n" +
               "6. Menggunakan bahasa Indonesia yang warm dan supportive\n" +
               "7. Menjaga kerahasiaan dan tidak menghakimi\n\n" +
               "Berikan respons yang singkat namun bermakna (maksimal 200 kata).";
    }

    /**
     * Membuat request body sesuai format Google Gemini API.
     */
    private Map<String, Object> createGeminiRequestBody(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        
        // Contents array
        Map<String, Object> content = new HashMap<>();
        
        Map<String, String> part = new HashMap<>();
        part.put("text", prompt);
        
        content.put("parts", List.of(part));
        requestBody.put("contents", List.of(content));
        
        // Generation config
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("topK", 40);
        generationConfig.put("topP", 0.9);
        generationConfig.put("maxOutputTokens", 1024);
        
        requestBody.put("generationConfig", generationConfig);
        
        // Safety settings untuk konten kesehatan mental
        Map<String, String> safetySettings = new HashMap<>();
        safetySettings.put("category", "HARM_CATEGORY_HARASSMENT");
        safetySettings.put("threshold", "BLOCK_MEDIUM_AND_ABOVE");
        
        requestBody.put("safetySettings", List.of(safetySettings));
        
        return requestBody;
    }

    /**
     * Parse respons dari Google Gemini API.
     */
    @SuppressWarnings("unchecked")
    private String parseGeminiResponse(Map<String, Object> responseBody) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> firstCandidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                
                if (parts != null && !parts.isEmpty()) {
                    String text = (String) parts.get(0).get("text");
                    return text != null ? text.trim() : getFallbackResponse("");
                }
            }
            
            log.warn("Respons Gemini tidak sesuai format yang diharapkan");
            return getFallbackResponse("");
            
        } catch (Exception e) {
            log.error("Gagal parsing respons Gemini: {}", e.getMessage());
            return getFallbackResponse("");
        }
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
        } else {
            return "Terima kasih telah berbagi cerita Anda. Saya menghargai kepercayaan yang Anda berikan. " +
                   "Apakah ada hal lain yang ingin Anda diskusikan atau tanyakan?";
        }
    }
}
