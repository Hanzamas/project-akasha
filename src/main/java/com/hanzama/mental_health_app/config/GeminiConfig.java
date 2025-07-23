package com.hanzama.mental_health_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * Konfigurasi untuk integrasi Google Gemini API.
 * Menyediakan RestTemplate yang dikonfigurasi untuk melakukan panggilan HTTP
 * ke layanan Google Gemini AI.
 */
@Configuration
public class GeminiConfig {

    /**
     * Bean RestTemplate untuk melakukan HTTP requests ke Google Gemini API.
     * Dikonfigurasi dengan timeout yang sesuai untuk menghindari hanging requests.
     * 
     * @return RestTemplate yang siap digunakan untuk API calls
     */
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        
        // Konfigurasi timeout untuk koneksi ke API eksternal
        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        ((SimpleClientHttpRequestFactory) requestFactory).setConnectTimeout(30000); // 30 detik
        ((SimpleClientHttpRequestFactory) requestFactory).setReadTimeout(60000);    // 60 detik
        
        restTemplate.setRequestFactory(requestFactory);
        
        return restTemplate;
    }
}
