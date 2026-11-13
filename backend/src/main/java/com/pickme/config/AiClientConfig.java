package com.pickme.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

/** FastAPI(AI 서버) 호출용 RestClient */
@Configuration
public class AiClientConfig {

    @Bean
    RestClient aiRestClient(RestClient.Builder builder, PickmeProperties props) {
        return builder.baseUrl(props.aiServerUrl()).build();
    }
}
