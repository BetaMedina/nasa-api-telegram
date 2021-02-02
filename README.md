<p align="center"><img src="https://cdn.discordapp.com/attachments/777184392078426124/806010446493515806/nasa_insignia_300.jpg?size=256" style="border-radius:50%"></p>


### Escolhas de desenvolvimento:

- Utilização de clean architecture
- DDD
- Typescript
- Axios
- express
- mongo Atlas
- heroku



### Features previstas:

- Retirada do cron (Feito para um MVC) e colocar protocolo ampq para disponibilização de mensagens de forma mais escalavel
- Melhorar interpretação de mensagens, evitando que a frase tenha que ser 100% igual a frase esperada
- Registrar logs de forma efetiva
- Monitoramento do feed do telegram, para evitar que o webhook seja superlotado
- Inserir testes de integração

#### Importante

- Utilize o .env-example para preenchimento de suas envs
- O mongodb utilizado está no servidor do atlas, logo, a latencia do projeto pode estar relativamente alta.
- PR'S são sempre bem vindos
- Evite Middle Man


# Nasa - Telegram - BOT

Olá, como vão terráqueos?
Este que projeto consome a api da nasa para extrair as informações mais confiaveis possiveis de meteoros que irão se aproximar da órbita terrestre.<br>
<br><b>Como ele me notifica?</b><br>
Atraves do sistema do telegram, pode-se acionar a trigger que é enviada via webhook para a api em questão, fazendo com o que ele consuma a api da nasa e devolva as mensagens através da api do telegram

# Instalação

O bot atualmente esta no servidor do heroku, para utilizar o desenvolvimento do local, o dev nescessitará de um servidor com o protocolo https para executar o mesmo<br>
Porem se quiser utilizar a api e criar um mock do telegram (Mande pr's), basta executar o script:<br>
<br>
``
npm install
``<br><br>
``
npm run dev
``
<br>
<b>Como testar o bot no telegram?</b><br>
Basta procurar no telegram o seguinte user <b>@end_word_medina_bot_teste_bot</b>

### Testes:
- Run `npm run test` para testes unitarios 
- Run `npm run test:watch` para testes monitorados 


## Guia rápido de sobrevivência com o Nasa BOT

Para utilizar o bot, é necessário conhecer os seguintes comandos:
|    Comando     |Ação                           
|----------------|-------------------------------
|Algum asteroide oferece perigo ao planeta Terra na data de hoje?| `Deve-se se trazer uma lista com possiveis meteoros que estão proximos da terra`|            
|Quero receber notificiações!          |`Será cadastrado no cron que envia mensagens todo dia 9:40 da manha sobre possiveis ameaças`            |





