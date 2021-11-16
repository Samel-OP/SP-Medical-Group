export const usuarioAutenticado = () => localStorage.getItem('usuario-login') !== null;

export const parseJwt = () => {
    //Define a variável base64 para receber o payload do token do usuário logado
    let base64 = localStorage.getItem('usuario-login').split('.')[1];

    //Converte o base64 a partir do window(uma parte principal do documento do 
    //navegador DOM usando atob para transformar em string e depois com JSON.parse 
    //para deixar no formato JSON) 
    return JSON.parse( window.atob(base64) );
}