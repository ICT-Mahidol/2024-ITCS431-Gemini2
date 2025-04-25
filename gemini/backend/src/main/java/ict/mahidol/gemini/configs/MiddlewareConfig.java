package ict.mahidol.gemini.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ict.mahidol.gemini.utils.Middleware;

@Configuration
public class MiddlewareConfig {

    @Autowired
    private Middleware middleware;

    @Bean
    public FilterRegistrationBean<Middleware> jwtFilterRegistration() {
        FilterRegistrationBean<Middleware> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(middleware);
        registrationBean.addUrlPatterns("/api/v1/scienceplan/*");
        return registrationBean;
    }
}
