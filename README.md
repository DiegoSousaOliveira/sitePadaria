# Site Para Uma Padaria
O site foi desenvolvido em python junto com os frameworks django e djangorestfremawork ( para a contrução da api ). Além disso o site foi construido dentro de um contrainer docker para ser mais fácil de colocar em desenvolvimernto e garante que rode em qualquer máquina que tenhar o docker instalado nela.

## Passo a Passo para Execultar a aplicação na sua Máquina localmente
Antes de começa o passo a passo é preciso que você tenha o docker instalado em sua máquina! E caso seja windows é preciso que o app docker esteja aberto!

- 1 - Entrar na pasta do projeto
  
  Quando você baixar o projeto é preciso entrar dentro da pasta onde está o projeto ou via terminal ou pelo vs code, Pycharm ou outra IDE que você prefira usar.
  Ex. de comando via terminal windows:
  
    ```
      cd ./caminho_pasta/sitePadaria
    ```

- 2 - Configurando o Banco de dados da aplicação
  
  Agora abra sua IDE como por exemplo o vs code, e dentro da pasta sitePadaria tem uma pasta chamada dotenv_files nela a algumas variaveis que precisam ser configuradas
  
  ![venv-exemplo](https://github.com/user-attachments/assets/91767d85-eb3e-4757-81ac-ddc727c852a9)

  ### você deve configura as seguintes variavies:
  
  ```
  SECRET_KEY="CHANGE-ME" # prcisar ser configuradar

  # 0 False, 1 True
  DEBUG="1"
  
  # Comma Separated values
  ALLOWED_HOSTS="127.0.0.1, localhost"
  
  DB_ENGINE="django.db.backends.postgresql"
  POSTGRES_DB="CHANGE-ME" # prcisar ser configuradar
  POSTGRES_USER="CHANGE-ME" # prcisar ser configuradar
  POSTGRES_PASSWORD="CHANGE-ME" # prcisar ser configuradar
  POSTGRES_HOST="localhost"
  POSTGRES_PORT="5432"
  ```

  após a configuração você renomea o arquivo .venv-example para .venv

- 3 - Configurando o mantainer em Dockerfile
  
  No arquivo Dockerfile em sitePadaria no atributo manteiner você colocar seu email.
  
  ![dockerFile](https://github.com/user-attachments/assets/8f7060ad-121d-4573-9329-904f2776635b)

- 4 - Buildando sua aplicação com o Docker
  
  Após essas configurações você já pode buildar sua aplicação para o docker. Então agora você deve abre o terminal de sua preferencia dentro da pasta da aplicação e digitar esse comado:

  ```
    docker compose up --build
  ```

  após ele buildar sua aplicação. Ele vai execulta o container da sua aplicação. Agora basta abri seu navegador e digitar http://127.0.0.1:8000/ na url do navegador ou click na url geradar no terminal
  mais essa url não vai funcionar, pois a que está configurada para rodar localmente é a http://127.0.0.1:8000/. Caso você queira acessa a api da aplicição aqui esta a url http://127.0.0.1:8000/api/products/.
  
    


