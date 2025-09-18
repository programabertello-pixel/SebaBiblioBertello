@echo off
echo Compilando...
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo Node.js no encontrado. Instalá Node LTS desde https://nodejs.org/ y volvé a intentar.
  pause
  exit /b 1
)
npm ci --no-audit --no-fund
npx electron-builder --config apps/client/electron-builder.yml --project apps/client --win portable
npx electron-builder --config apps/console/electron-builder.yml --project apps/console --win portable
echo.
echo Listo, los ejecutables están en apps\client\dist\ y apps\console\dist\
pause
