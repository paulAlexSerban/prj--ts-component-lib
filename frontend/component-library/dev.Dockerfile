FROM nginx:latest

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
