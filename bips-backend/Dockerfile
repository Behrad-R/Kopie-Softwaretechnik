FROM openjdk:11.0.9.1-jre

#Workaround for h2 to be unable to read from classpath resource
WORKDIR /tmp

COPY src/main/resources/example.pdf .
COPY src/main/resources/example2.pdf .
#Workaround end

WORKDIR /opt/bips

#COPY target/bips.jar .
COPY bips.jar .


# use this cmd for remote debugging
#CMD ["java", "-jar", "-Dspring.profiles.active=docker", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "bips.jar"]
CMD ["java", "-jar", "-Dspring.profiles.active=docker", "bips.jar"]

