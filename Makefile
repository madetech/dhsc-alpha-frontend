docker-up:
	docker-compose -f ./vite-app/docker-compose.yml up -d

docker-up-rebuild:
	docker-compose -f ./vite-app/docker-compose.yml up -d --build --force-recreate

docker-down:
	docker-compose -f ./vite-app/docker-compose.yml down