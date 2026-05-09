@echo off
title Abrir Site Local - Renan Filg
echo.
echo  ==========================================
echo   INICIANDO AMBIENTE DE DESENVOLVIMENTO...
echo  ==========================================
echo.

:: Verifica se a pasta node_modules existe
if not exist "node_modules\" (
    echo Instalando dependencias (isso pode demorar um pouco na primeira vez)...
    call npm install
)

echo.
echo Iniciando servidor e abrindo navegador...
echo.

:: Inicia o Vite e abre o navegador automaticamente (o --open faz o vite abrir sozinho)
call npm run dev -- --open
