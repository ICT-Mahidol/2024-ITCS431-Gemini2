### The system is located in the gemini folder

#### Setup instruction

1. run `cd gemini/frontend`
2. install deno `https://deno.com/`
3. run `deno install`
4. run `deno task dev` to start the frontend server
5. run `cd ../backend`
6. run `./gradlew clean build`
7. run `./gradlew bootrun` to clean and start the backend server at the same time
8. go to your favorite browser and open http://localhost:5173
9. Test input username as "myUser" and password as "myPassword"
10. The website will then indicate success message but if the username or password is wrong, the website will then shows the unauthorized message.
