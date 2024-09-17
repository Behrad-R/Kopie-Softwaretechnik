FROM jboss/keycloak

WORKDIR /tmp

COPY bips-realm.json .

ENV KEYCLOAK_IMPORT=/tmp/bips-realm.json

ENTRYPOINT ["/opt/jboss/tools/docker-entrypoint.sh"]