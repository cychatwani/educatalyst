package tech.educatalyst.api;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sendgrid.Response;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import redis.clients.jedis.Jedis;
import tech.educatalyst.api.Services.EmailServices;

import java.io.IOException;
import java.util.Set;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"tech.educatalyst.api.JpaRepositories"})
@EntityScan(basePackages = {"tech.educatalyst.api.Models"})
@ComponentScan(basePackages = {
		"tech.educatalyst.api.Security",
		"tech.educatalyst.api.Models",
		"tech.educatalyst.api.Services",
		"tech.educatalyst.api.JpaRepositories",
		"tech.educatalyst.api.Controllers"
})
@RestController
public class ApiApplication {
	public static void main(String[] args) throws IOException {
		EmailServices emailServices = new EmailServices("cyc4404@gmail.com","cyc4597@gmail.com","Test SendGrid","Hello WOrld");
//		Response response =  emailServices.sendMail();
//		System.out.println("Hello SENDING ... ");
//		System.out.println(response.getStatusCode());
//		System.out.println(response.getBody());
//		System.out.println(response.getHeaders());
		SpringApplication.run(ApiApplication.class, args);
	}

}
