@echo off
title Gerador de Versao Portatil - Renan Filg
echo.
echo  ==========================================
echo   GERANDO ARQUIVO UNICO (PORTATIL)...
echo  ==========================================
echo.

:: Build do projeto
set VITE_SINGLE_FILE=true
call npm run build
set VITE_SINGLE_FILE=

:: Copia o resultado para a raiz com um nome amigavel
if exist "dist\index.html" (
    copy "dist\index.html" "RenanFilg_SitePortatil.html" /y
    echo.
    echo  ==========================================
    echo   SUCESSO! Arquivo gerado: 
    echo   "RenanFilg_SitePortatil.html"
    echo  ==========================================
) else (
    echo.
    echo  ERRO ao gerar o arquivo. Verifique o terminal.
)

echo.
pause
