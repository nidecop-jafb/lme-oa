/* acessos.js — contador de acessos do site (gerado por
   _scripts/gerar_contador_lme.py; nao editar a mao).

   O que sobe: data/hora (posta pelo servidor), disciplina e pagina. Nada mais.
   Sem RA, sem nome, sem IP, sem cookie, sem identificador de visitante.

   Deduplicacao: uma contagem por pagina por SESSAO do navegador. O F5 nao
   conta de novo; fechar o navegador e voltar depois conta. A marca fica em
   sessionStorage, aqui no aparelho — nao viaja para a planilha.

   Falha e silenciosa: se o servico nao responder, a pagina funciona igual e o
   selo nao aparece. O contador nunca pode ser motivo de erro para o estudante. */
(function () {
  var cfg = window.CONTADOR || {};
  if (!cfg.url) return;                         /* contador desligado */
  if (!location.protocol.match(/^https?:/)) return;  /* aberto do disco */

  function jaContou(chave) {
    try {
      if (sessionStorage.getItem(chave)) return true;
      sessionStorage.setItem(chave, '1');
      return false;
    } catch (e) {
      return false;  /* navegador sem sessionStorage: conta, e melhor que nao contar */
    }
  }

  function registrar(pagina, aoTotal) {
    if (jaContou('acessos:' + cfg.disciplina + ':' + pagina)) {
      if (aoTotal) mostrarTotalGuardado();
      return;
    }
    fetch(cfg.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ tipo_msg: 'ACESSO', disciplina: cfg.disciplina,
                             pagina: pagina })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok) return;
        try { sessionStorage.setItem('acessos:total:' + cfg.disciplina, res.total); }
        catch (e) { /* sem storage, o selo so nao sobrevive a navegacao */ }
        if (aoTotal) mostrarTotal(res.total);
      })
      .catch(function () { /* silencio: o site nao depende do contador */ });
  }

  function mostrarTotal(total) {
    var selo = document.getElementById('seloAcessos');
    if (!selo || !total) return;
    selo.innerHTML = '<strong style="color: var(--epi);">' + Number(total).toLocaleString('pt-BR') + ' acessos</strong>';
    selo.style.display = '';
  }

  function mostrarTotalGuardado() {
    var t;
    try { t = sessionStorage.getItem('acessos:total:' + cfg.disciplina); }
    catch (e) { t = null; }
    if (t) { mostrarTotal(t); return; }
    fetch(cfg.url + '?total=1&disciplina=' + encodeURIComponent(cfg.disciplina))
      .then(function (r) { return r.json(); })
      .then(function (res) { if (res && res.ok) mostrarTotal(res.total); })
      .catch(function () { /* silencio */ });
  }

  /* As abas laterais do indice sao paineis DENTRO da propria pagina: o que se
     conta e o clique na lingueta, uma vez por sessao, e ele nao entra no total
     do site (quem ja abriu o indice ja foi contado). */
  var LINGUETAS = [['abaMetodoT', 'aba:metodo'], ['abaDocumentosT', 'aba:documentos'],
                   ['abaSiteT', 'aba:site'], ['abaMusicaT', 'aba:musica'],
                   ['abaIneditismoT', 'aba:ineditismo'], ['abaCreditosT', 'aba:creditos']];

  function ligarLinguetas() {
    LINGUETAS.forEach(function (par) {
      var el = document.getElementById(par[0]);
      if (el) el.addEventListener('click', function () { registrar(par[1], false); });
    });
  }

  var pagina = (document.body && document.body.getAttribute('data-pagina')) || 'outra';
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ligarLinguetas);
  } else {
    ligarLinguetas();
  }
  registrar(pagina, true);
})();
