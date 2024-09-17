package de.eightgile.bips.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.tuckey.web.filters.urlrewrite.Conf;
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import java.io.IOException;

@Configuration
public class ReactConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/webjars/**")
                .addResourceLocations("/webjars/");
    }

    @Component
    public static class ReactUrlRewriteFilter extends UrlRewriteFilter {
        private static final String CONFIG_LOCATION = "classpath:/urlrewrite.xml";

        @Value(CONFIG_LOCATION)
        private Resource resource;

        @Override
        protected void loadUrlRewriter(FilterConfig filterConfig) throws ServletException {
            try {
                Conf conf = new Conf(filterConfig.getServletContext(), resource.getInputStream(), resource.getFilename(), "");
                checkConf(conf);
            } catch (IOException ex) {
                throw new ServletException("Unable to load URL-rewrite configuration file from " + CONFIG_LOCATION, ex);
            }
        }
    }

}