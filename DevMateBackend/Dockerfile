FROM amazoncorretto:17-alpine

ARG JAR_FILE=./build/libs/devamte-*.jar

WORKDIR /opt/app

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]