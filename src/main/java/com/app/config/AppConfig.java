package com.app.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.app"})
public class AppConfig extends WebMvcConfigurerAdapter {

//    @Autowired
//    RoleToUserProfileConverter roleToUserProfileConverter;

    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("/app/");
        internalResourceViewResolver.setSuffix(".jsp");
        return internalResourceViewResolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/META-INF/resources/webjars/").setCachePeriod(31556926);
        registry.addResourceHandler("/css/**").addResourceLocations("/css/").setCachePeriod(31556926);
        registry.addResourceHandler("/img/**").addResourceLocations("/img/").setCachePeriod(31556926);
        registry.addResourceHandler("/app/**").addResourceLocations("/app/").setCachePeriod(31556926);
        registry.addResourceHandler("/scripts/**").addResourceLocations("/scripts/").setCachePeriod(31556926);
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    /**
     * Configure Converter to be used.
     * In our example, we need a converter to convert string values[Roles] to UserProfiles in newUser.jsp
     */
//    @Override
//    public void addFormatters(FormatterRegistry registry) {
//        registry.addConverter(roleToUserProfileConverter);
//    }

    /**
     * Configure MessageSource to lookup any validation/error message in internationalized property files
     */
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        return messageSource;
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer matcher) {
        matcher.setUseRegisteredSuffixPatternMatch(true);
    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/list2").allowedOrigins("http://localhost:8080/application");
//            }
//        };
//    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "OPTIONS", "PUT")
//            .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method",
//                "Access-Control-Request-Headers")
//            .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
//            .allowCredentials(true).maxAge(3600);
//    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//            .allowedOrigins("127.0.0.1:8080")
//            .allowedMethods("PUT", "DELETE")
//            .allowedHeaders("header1", "header2", "header3")
//            .exposedHeaders("header1", "header2")
//            .allowCredentials(false).maxAge(3601);
//    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}