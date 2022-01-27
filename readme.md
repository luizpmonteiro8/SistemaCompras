## Índice


[Introdução](https://github.com/luizpmonteiro8/SistemaCompras#introdu%C3%A7%C3%A3o)

[1.Diagrama E-R - Modelo de banco de dados ](https://github.com/luizpmonteiro8/SistemaCompras#1-diagrama-e-r---modelo-de-banco-de-dados)

[2.Diagrama de Classe](https://github.com/luizpmonteiro8/SistemaCompras#2-diagrama-de-classe)

[3.Tecnologia utilizadas](https://github.com/luizpmonteiro8/SistemaCompras#3-tecnologias-utilizadas)

[4. Interface do sistema](https://github.com/luizpmonteiro8/SistemaCompras#4-interface-do-sistema)

[5. Informações adicionais](https://github.com/luizpmonteiro8/SistemaCompras#5-informa%C3%A7%C3%B5es-adicionais)

[6.Conclusão](https://github.com/luizpmonteiro8/SistemaCompras#6-conclus%C3%A3o)

[7.Extra](https://github.com/luizpmonteiro8/SistemaCompras#extra)



### Introdução:

Sistema de compras

Este artigo descreve um sistema de gerenciamento de compras doméstica onde é possível efetuar cadastro das compras do mercado e fazer o controle de estoque dos produtos. Abordando também o desenvolvimento do sistema em etapas contendo, diagrama de classes, modelagem de banco de dados, tecnologias utilizadas, principais telas do sistema, configurações para melhoria e testes automatizados.

Backend:  roda no heroku. <a href="https://appcomprasluiz.herokuapp.com" target="_blank">https://appcomprasluiz.herokuapp.com</a><br>
Frontend: rodando no vercel. <a href=" https://sistema-compras-om8ie1vko-luizpmonteiro8.vercel.app" target="_blank"> https://sistema-compras-om8ie1vko-luizpmonteiro8.vercel.app</a> <br>
Banco de dados: Postgre no heroku.

### 1. Diagrama E-R - Modelo de banco de dados
A **figura 1** representa graficamente as entidades e seus relacionamentos com as demais entidades do banco de dados.
<a href="https://uploaddeimagens.com.br/images/003/649/036/original/er.png?1643253674">
<img src="https://uploaddeimagens.com.br/images/003/649/036/original/er.png?1643253674" alt="Diagrama ER" title="Clique para ampliar" />
  <p align="center">
    <b>Figura 1 - Diagrama ER</b>
  </p>
  </a>
  
  ### 2. Diagrama de Classe
A  **figura 2**  descreve a estrutura do sistema modelando suas classes descrevendo, seus atributos e as relações entre objetos.
<a href="https://uploaddeimagens.com.br/images/003/649/046/original/uml.png?1643254544">
<img src="https://uploaddeimagens.com.br/images/003/649/046/original/uml.png?1643254544" alt="Diagrama Classe" title="Clique para ampliar" />
  <p align="center">
    <b>**Figura 2 - Diagrama de classe**</b>
  </p>
   </a>

### 3. Tecnologias Utilizadas

**Backend:**

Springboot:
 - Jsonwebtoken
 - Lombok
 - Jasper Reports
 - Spring boot starter mail
 - Spring boot starter test
 - e outros.

**Frontend:**

React:
 - Next.js
 - Axios
 - Redux
 - Redux-thunk
 - React-cookie
 - Apexchart
 - Formik
 - Yup
 - React-bootstrap-table-next
 - Bootstrap
 - Styled-components
 - React-toastify
 - Jest
 - e outros.

**Mobile:**
React-native:
 - Axios
 - Redux
 - Redux-thunk
 - Formik
 - Yup
 - Jwt-decode
 - React-native-chart-kit
 - React-native-paper
 - Jest
 - e outros.

### 4. Interface do sistema

**Login:**

Na tela de login, é preciso digitar email e senha para autenticar, também possível entrar na tela de cadastro de usuário e recuperar a senha através do email. 
<a href="https://uploaddeimagens.com.br/images/003/649/058/original/01_-_login.png?1643256173">
<img src="https://uploaddeimagens.com.br/images/003/649/058/original/01_-_login.png?1643256173" alt="tela de login" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 3 - Tela de login**</b>
  </p>  
  </a>

**Cadastro:**

Tela de cadastro pede que usuário digite nome, email e senha, onde o email deve ser único.
<a href="https://uploaddeimagens.com.br/images/003/649/064/original/02-_tela_de_cadastro.png?1643257333">
<img src="https://uploaddeimagens.com.br/images/003/649/064/original/02-_tela_de_cadastro.png?1643257333" alt="tela de cadastro" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 4 - Tela de cadastro**</b>
  </p>  
  </a>

**Recuperação de senha:**

Na recuperação de senha, quando clicado aparece uma opção para digitar email, após verificação e enviado email com uma nova senha aleatória. Na versão mobile ele utiliza o email já digitado na opção de login.
<a href="https://uploaddeimagens.com.br/images/003/649/066/original/03-recuperar_senha.png?1643257952">
<img src="https://uploaddeimagens.com.br/images/003/649/066/original/03-recuperar_senha.png?1643257952" alt="tela de recuperar senha" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 5 - Tela de recuperar senha**</b>
  </p>  
  </a>


**Home:**

Após login é direcionado para tela home, onde mostra a quantidade de cadastro de produtos e compras, um gráfico de compras por mês fixado no ano de 2021. A barra de menu aparece nesta tela após confirmado o login.
<a href="https://uploaddeimagens.com.br/images/003/649/067/original/04-tela_de_login.png?1643258414">
<img src="https://uploaddeimagens.com.br/images/003/649/067/original/04-tela_de_login.png?1643258414" alt="tela home" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 6- Tela home**</b>
  </p>  
  </a>


**Menu:**

O menu tem três abas de opção (Cadastrar/Listar, compras, relatórios), botão sair e o título do sistema que volta para tela home. Já na versão web possui botão home, cadastros, listas e o botão logout.

<a href="https://uploaddeimagens.com.br/images/003/649/068/original/05-menu.png?1643259120">
<img src="https://uploaddeimagens.com.br/images/003/649/068/original/05-menu.png?1643259120" alt="menu" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 7 -Menu**</b>
  </p>  
  </a>


**Cadastro:**

O sistema trabalha com cadastro de: mercados, categorias, produtos, entrada/saída de produtos e compras.

**Mercado:**

No cadastro de mercado é necessário informar o nome do local como campo obrigatório, também pode ser informado o cnpj e bloquear para não aparecer na lista quando for ser listado. Na versão web a lista de mercados cadastrados aparece e também permite a alteração e deletar o mercado. 

<a href="https://uploaddeimagens.com.br/images/003/649/072/original/06-_cadastro_de_mercado.png?1643259716">
<img src="https://uploaddeimagens.com.br/images/003/649/072/original/06-_cadastro_de_mercado.png?1643259716" alt="cadastro de mercado" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 8 -Cadastro de mercado**</b>
  </p>  
  </a>

**Categoria:**

No cadastro da categoria é necessário informa o nome da categoria como campo obrigatório. Na versão web a lista de categorias cadastrada aparece e também permite a alteração e deletar.
<a href="https://uploaddeimagens.com.br/images/003/649/073/original/Sem_07-_cadastro_de_categoria.png?1643260336">
<img src="https://uploaddeimagens.com.br/images/003/649/073/original/Sem_07-_cadastro_de_categoria.png?1643260336" alt="cadastro de categoria" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 9 -Cadastro de categoria**</b>
  </p>  
  </a>



**Produtos:**

No cadastro de produtos é necessário informa a categoria do produto, nome, quantidade mínima e se o produto está bloqueado. A categoria aparece é uma lista onde só é possível escolher uma. Na versão web a lista de produtos cadastrado aparece e também permite a alteração e deletar.
<a href="https://uploaddeimagens.com.br/images/003/649/077/original/08-cadastro_de_produto.png?1643260765">
<img src="https://uploaddeimagens.com.br/images/003/649/077/original/08-cadastro_de_produto.png?1643260765" alt="cadastro de produto" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 10 -Cadastro de produto**</b>
  </p>  
  </a>

**Compras:**

No cadastro de compras, deve ser informado mercado, data e o status da compra e também gerar a lista de item da compra.

Deve escolher um produto, quantidade, preço e opcionalmente a validade para cadastra um item na lista de compras. A opção de categoria serve para facilitar filtrando os produtos.

Produtos adicionado na compra fica salvo em cookie, onde o usuário pode fechar o site ou aplicativo e depois quando retorna a lista ainda está como antes. Quando é feito a alteração de uma compra cadastrada (permitido apenas compras com status em rota) é possível adicionar item a compra sem fazer alteração com produtos cadastrados em cookie.

Quando a compra é finalizada é enviado um email, onde mostra a lista de item da compra como na figura abaixo.

<a href="https://uploaddeimagens.com.br/images/003/649/078/original/09-cadastro_de_compras.png?1643261308">
<img src="https://uploaddeimagens.com.br/images/003/649/078/original/09-cadastro_de_compras.png?1643261308" alt="cadastro de compra" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 11 -Cadastro de compra**</b>
  </p>  
  </a>

<a href="https://uploaddeimagens.com.br/images/003/649/135/original/23-_email_confirmacao_compra.png?1643280211">
<img src="https://uploaddeimagens.com.br/images/003/649/135/original/23-_email_confirmacao_compra.png?1643280211" alt="email de compra" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 11.1 -Email confirmando cadastro de compras**</b>
  </p>  
  </a>


**Entrada/saída:**

No cadastro de entrada/saída, o usuário pode adicionar produtos que já tem em estoque, também informar os produtos que estão utilizados com a saída dos produtos. Caso a retirada do produto seja maior que a quantidade em estoque, deve mostrar um erro na tela informando a quantidade de produto em estoque.
<a href="https://uploaddeimagens.com.br/images/003/649/081/original/10-_cadastro_entrada_e_saida.png?1643262559">
<img src="https://uploaddeimagens.com.br/images/003/649/081/original/10-_cadastro_entrada_e_saida.png?1643262559" alt="cadastro de entra saida" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 12 -Cadastro de entrada e saída**</b>
  </p>  
  </a>



**Listas na versão mobile:**

Na versão web em todas as telas menos no cadastro de compras a lista de itens cadastrado é mostrado junto com o cadastro, na versão mobile as listas ficam separadas.

Todas as listas da versão mobile tem a opção de alterar e deletar os itens, no caso das compras só e possível alterar se ainda estiver com status em rota.

Também possui a opção de listar as compras em formato pdf.

<a href="https://uploaddeimagens.com.br/images/003/649/082/original/11-_listas_mobile.png?1643263600">
<img src="https://uploaddeimagens.com.br/images/003/649/082/original/11-_listas_mobile.png?1643263600" alt="lista" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 13- Lista no mobile**</b>
  </p>  
  </a>

**Relatório:**

No relatório na versão web é possível visualizar a lista de estoque dos produtos, lista de compras e compras em pdf.

Na lista de estoque é possível visualizar categoria, produto, quantidade e se está bloqueado.

Na lista de compras é possível visualizar data, mercado, status, total, botão para alterar ou visualizar e deletar.

Na opção para compras em pdf, ao clicar ele carrega o arquivo em pdf, onde tem um relatório de todas as compras cadastradas no sistema.

<a href="https://uploaddeimagens.com.br/images/003/649/089/original/13-_relatorio_de_estoque.png?1643264479">
<img src="https://uploaddeimagens.com.br/images/003/649/089/original/13-_relatorio_de_estoque.png?1643264479" alt="relatorio de estoque" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 14- Relatório de estoque de produto**</b>
  </p>  
  </a>

<a href="https://uploaddeimagens.com.br/images/003/649/085/original/imagem_2022-01-27_031006.png?1643263992">
<img src="https://uploaddeimagens.com.br/images/003/649/085/original/imagem_2022-01-27_031006.png?1643263992" alt="relatorio de compras" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 15- Relatório de compras**</b>
  </p>  
  </a>
  
<a href="https://uploaddeimagens.com.br/images/003/649/091/original/imagem_2022-01-27_032108.png?1643264654">
<img src="https://uploaddeimagens.com.br/images/003/649/091/original/imagem_2022-01-27_032108.png?1643264654" alt="relatorio de compras pdf" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 16- Relatório de compras em pdf página 1**</b>
  </p>  
  </a>

### 5. Informações adicionais

**Login:**

Caso o servidor de backend, ainda esteja inicializado será informado ao usuário através de uma mensagem. Digitando email ou senha inválido deve mostrar um erro na tela.

<a href="https://uploaddeimagens.com.br/images/003/649/092/original/imagem_2022-01-27_032534.png?1643264920">
<img src="https://uploaddeimagens.com.br/images/003/649/092/original/imagem_2022-01-27_032534.png?1643264920" alt="mensagem de espera ao logar" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 17- Mensagem de espera ao logar**</b>
  </p>  
  </a>
  
<a href="https://uploaddeimagens.com.br/images/003/649/093/full/imagem_2022-01-27_033217.png?1643265323">
<img src="https://uploaddeimagens.com.br/images/003/649/093/full/imagem_2022-01-27_033217.png?1643265323" alt="mensagem de espera ao logar" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 18- Mensagem quando digita senha ou email incorreto.**</b>
  </p>  
  </a>

**Recuperar senha:**

Só é permitido recuperar senha de usuário cadastrado, por exemplo o usuário teste, não pode ter sua senha recuperada, por padrão fica senha 12345678. Na versão mobile é utilizado o campo de email do login. Ao solicitar nova senha é enviado um email com uma senha aleatória de 10 dígitos.

<a href="https://uploaddeimagens.com.br/images/003/649/101/original/14-tela_de_recuperar_senha.png?1643265945">
<img src="https://uploaddeimagens.com.br/images/003/649/101/original/14-tela_de_recuperar_senha.png?1643265945" alt="tela de recuperar senha" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 19- Tela de recuperar senha.**</b>
  </p>  
  </a>

<a href="https://uploaddeimagens.com.br/images/003/649/136/original/22-_recuperacao_de_senha.png?1643280303">
<img src="https://uploaddeimagens.com.br/images/003/649/136/original/22-_recuperacao_de_senha.png?1643280303" alt="email com a nova senha" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 19.1- Email com a nova senha**</b>
  </p>  
  </a>

**Deletar:**

Só é possível deletar item do sistema que não esteja em uso, no caso de compras só pode deletar as que estiverem em rota, pois ainda não foram somadas ao estoque.

Deletar uma entrada/saída, não apagara do banco de dados, apenas mudara para o estado inativo. Como é possível ver na figura 12.

<a href="https://uploaddeimagens.com.br/images/003/649/102/original/15-_erro_deletar_produto_em_uso.png?1643266597">
<img src="https://uploaddeimagens.com.br/images/003/649/102/original/15-_erro_deletar_produto_em_uso.png?1643266597" alt="mensagem de erro ao deletar" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 20- Mensagem ao deletar item em uso.**</b>
  </p>  
  </a>

**Duplicado:**

Caso tente alterar ou cadastrar item que já possui no sistema receberá a mensagem de duplicado.

<a href="https://uploaddeimagens.com.br/images/003/649/104/full/16-duplicado.png?1643267733">
<img src="https://uploaddeimagens.com.br/images/003/649/104/full/16-duplicado.png?1643267733" alt="mensagem de erro diplicado" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 21- Mensagem ao adicionar item duplicado.**</b>
  </p>  
  </a>
  
**Salvo com sucesso ou alterado com sucesso:**

Sempre que ocorre um cadastro ou alteração será informando o sucesso para usuário através de uma mensagem. Na versão mobile apenas é carregado a tela de lista, só tem mensagem caso ocorra um erro.

<a href="https://uploaddeimagens.com.br/images/003/649/105/original/17-salvo_com_sucesso.png?1643268352">
<img src="https://uploaddeimagens.com.br/images/003/649/105/original/17-salvo_com_sucesso.png?1643268352" alt="mensagem de erro diplicado" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 22- Mensagem ao salvar com sucesso.**</b>
  </p>  
  </a>
  
**Campos obrigatórios**

Todos os cadastros possuem controle de campos obrigatório onde o usuário não tem permissão de salva o cadastro até que todos campos estejam preenchidos, como mostra a figura abaixo.
Essa mensagem de erro é mostrada quando é clicado no botão para salvar o formulário.

<a href="https://uploaddeimagens.com.br/images/003/649/106/original/18-_campo_obrigatorio.png?1643270494">
<img src="https://uploaddeimagens.com.br/images/003/649/106/original/18-_campo_obrigatorio.png?1643270494" alt="campo obrigatorio" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 23- Campo obrigatórios**</b>
  </p>  
  </a>

**Valores inválidos**

Todos os campos são validos quando é feito o envio do formulário, é feito uma verificação do tipo da informação, também os campos têm bloqueio por exemplo, na versão web se digitar letras onde deve colocar preço de compra, não vai ter entrada de valor, na versão mobile aparece apenas o teclado numérico como figura abaixo.

<a href="https://uploaddeimagens.com.br/images/003/649/107/original/19-_teclado_numerico.png?1643271304">
<img src="https://uploaddeimagens.com.br/images/003/649/107/original/19-_teclado_numerico.png?1643271304" alt="teclado numerico" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 24- Teclado numérico**</b>
  </p>  
  </a>

### 6. Conclusão
Sistema básico para controle de compras domésticos, criado com intuito de demostrar meus conhecimentos na área de desenvolvimento de software. 

### Extra

**Teste realizado no backend(junit 5):**

Foi realizado teste na classe de services, repository e controller do tipo Purchases. Todos os teste foram 100% de cobertura como mostra a figura 25.

<a href="https://uploaddeimagens.com.br/images/003/649/129/original/20-_testes.png?1643278007">
<img src="https://uploaddeimagens.com.br/images/003/649/129/original/20-_testes.png?1643278007" alt="teste realizado junit" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 25- Teste realizado no junit**</b>
  </p>  
  </a>

**Teste realizado no frontend(jest):**

Para o frontend foi feito teste no redux, redux-thunk, formulário de cadastro de categoria e lista de categoria, todos em 100% de cobertura.

<a href="https://uploaddeimagens.com.br/images/003/649/130/full/21-teste_jest.png?1643278218">
<img src="https://uploaddeimagens.com.br/images/003/649/130/full/21-teste_jest.png?1643278218" alt="teste realizado jest" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 26- Teste realizado no jest**</b>
  </p>  
  </a>


