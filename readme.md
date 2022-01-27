## Índice

 - Introdução
 - 1. Diagrama E-R - Modelo de banco de dados 
 - 2. Diagrama de Classe
 - 3. Tecnologia utilizadas




**Introdução:**

Sistema de compras
Este artigo descreve um sistema de gerenciamento de compras domestica onde é possível efetuar cadastro das compras do mercado e fazer o controle do estoque dos produtos. Abordando também o desenvolvimento do sistema em etapas contendo, diagrama de classes, modelagem de banco de dados, tecnologias utilizadas, principais telas do sistema e as camada de segurança do sistema.

Backend:  roda no heroku. [https://appcomprasluiz.herokuapp.com/](https://appcomprasluiz.herokuapp.com/)
Frontend: rodando no vercel. https://vercel.com/luizpmonteiro8/sistema-compras/67KKMSALEzwDLARUZvjKgnQYR19w
Banco de dados: Postgre no heroku.

### Diagrama E-R - Modelo de banco de dados
A **figura 1** representa graficamente as entidades e seus relacionamentos com as de mais entidades do banco de dados.
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

### 3.Tecnologias Utilizadas

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

No cadastro de mercado é necessário informa o nome do local como campo obrigatório, também pode ser informado o cnpj e bloquear para não aparecer na lista quando for ser listado. Na versão web a lista de mercados cadastrados aparece e também permite a alteração e deletar o mercado. 

<a href="https://uploaddeimagens.com.br/images/003/649/072/original/06-_cadastro_de_mercado.png?1643259716">
<img src="https://uploaddeimagens.com.br/images/003/649/072/original/06-_cadastro_de_mercado.png?1643259716" alt="cadastro de mercado" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 8 -Cadastro de mercado**</b>
  </p>  
  </a>

**Categoria:**

No cadastro de categoria é necessário informa o nome da categoria como campo obrigatório. Na versão web a lista de categorias cadastrada aparece e também permite a alteração e deletar.
<a href="https://uploaddeimagens.com.br/images/003/649/073/original/Sem_07-_cadastro_de_categoria.png?1643260336">
<img src="https://uploaddeimagens.com.br/images/003/649/073/original/Sem_07-_cadastro_de_categoria.png?1643260336" alt="cadastro de categoria" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 9 -Cadastro de categoria**</b>
  </p>  
  </a>



**Produtos:**

No cadastro de produtos é necessário informa a categoria do produto, nome, quantidade mínima e se o produto está bloqueado. A categoria aparece e uma lista onde só é possível escolher uma. Na versão web a lista de produtos cadastrado aparece e também permite a alteração e deletar.
<a href="https://uploaddeimagens.com.br/images/003/649/077/original/08-cadastro_de_produto.png?1643260765">
<img src="https://uploaddeimagens.com.br/images/003/649/077/original/08-cadastro_de_produto.png?1643260765" alt="cadastro de produto" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 10 -Cadastro de produto**</b>
  </p>  
  </a>

**Compras:**

No cadastro de compras, deve informa mercado, data e o status da compra e também gerar a lista de item da compra.

Deve escolher um produto, quantidade, preço e opcionalmente a validade para cadastra um item na lista de compras. A opção de categoria serve para facilitar filtrando os produtos.

Produtos adicionado na compra fica salvo em cookie, onde o usuário pode fechar o site ou aplicativo e depois quando retorna a lista ainda está como antes. Quando é feito a alteração de uma compra cadastrada (permitido apenas compras com status em rota) é possível adicionar item a compra sem fazer alteração com produtos cadastrados em cookie.
<a href="https://uploaddeimagens.com.br/images/003/649/078/original/09-cadastro_de_compras.png?1643261308">
<img src="https://uploaddeimagens.com.br/images/003/649/078/original/09-cadastro_de_compras.png?1643261308" alt="cadastro de compra" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 11 -Cadastro de compra**</b>
  </p>  
  </a>

**Entrada/saída:**

No cadastro de entrada/saída, o usuário pode adicionar produtos que já tem em estoque, também informa os produtos que estão utilizados com a saída dos produtos. Caso a retirada do produto seja maior que a quantidade em estoque, deve mostrar um erro na tela informando a quantidade de produto em estoque.
<a href="https://uploaddeimagens.com.br/images/003/649/081/original/10-_cadastro_entrada_e_saida.png?1643262559">
<img src="https://uploaddeimagens.com.br/images/003/649/081/original/10-_cadastro_entrada_e_saida.png?1643262559" alt="cadastro de entra saida" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 12 -Cadastro de entrada e saída**</b>
  </p>  
  </a>



**Listas na versão mobile:**

Na versão web em todas as telas menos no cadastro de compras a lista de item cadastrada é mostrado junto com o cadastro, na versão mobile as listas ficam separadas.

Todas as listas da versão mobile tem a opção de alterar e deletar os item, no caso da compras só e possível alterar se ainda estiver com status em rota.

Também possui a opção de lista compras em formato pdf.

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

Na opção para compras em pdf, ao clicar ele carrega o arquivo em pdf, onde tem um relatório de todas as compras cadastrada no sistema.

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

Caso o servidor de backend, ainda esteja inicializado será informado ao usuário através de uma mensagem. Digitando email ou senha invalido deve mostrar um erro na tela.

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

Só é permitido recuperar senha de usuário cadastrado, por exemplo o usuário teste, não pode ter sua senha recuperada, por padrão fica senha 12345678. Na versão mobile é utilizado o campo de email do login.

<a href="https://uploaddeimagens.com.br/images/003/649/101/original/14-tela_de_recuperar_senha.png?1643265945">
<img src="https://uploaddeimagens.com.br/images/003/649/101/original/14-tela_de_recuperar_senha.png?1643265945" alt="tela de recuperar senha" title="Clique para ampliar" />
 <p align="center">
    <b>**Figura 19- Tela de recuperar senha.**</b>
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









 


