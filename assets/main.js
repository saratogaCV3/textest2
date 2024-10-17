async function compile() {
    let mainLatex = document.getElementById('latex-main').value;

    let section1 = await fetch('section1.tex').then(response => response.text());
    let section2 = await fetch('section2.tex').then(response => response.text());
    let jsarticle = await fetch('jsarticle.cls').then(response => response.text());

    mainLatex = mainLatex.replace("\\input{section1}", section1);
    mainLatex = mainLatex.replace("\\input{section2}", section2);

    mainLatex = mainLatex.replace("\\documentclass{jsarticle}", jsarticle + "\\documentclass{article}");

    tex.compile(mainLatex).then(function (pdf) {
        var blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'output.pdf';
        link.click();
    });
}