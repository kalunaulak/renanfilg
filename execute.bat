@echo off
title Renan Filg - Servidor de Desenvolvimento
echo.
echo  ==========================================
echo   RENAN FILG ^| Iniciando servidor local...
echo  ==========================================
echo.

:: Instala dependencias se node_modules nao existir
if not exist "node_modules\" (
    echo Instalando dependencias...
    npm install
    echo.
)

echo Iniciando servidor... O navegador vai abrir sozinho.
echo.
echo  Pressione CTRL+C nesta janela para desligar o site.
echo.

:: Roda o servidor e manda o Vite abrir no navegador correto
npm run dev -- --open

pause
