# metrics
> https://learn.microsoft.com/en-us/azure/azure-monitor/reference/metrics-index
> search for the resource you want to monitor

# log analytics workspace
> it works with azure monitoring
> it stores the log
> it uses KQL languae usign which we can query log


# demo
- Azure VM
  - alert for VM (iuf cpu utilization is > 80% then send email)
 
### CPU load increase script
> loadTest.bat
```
@echo off
setlocal
title Windows VM - 85%% CPU Load Test

echo ==========================================
echo       WINDOWS VM - 85%% CPU LOAD
echo ==========================================
echo.

set /p DURATION="Enter duration in seconds: "

REM Detect CPU count
for /f %%A in ('powershell -NoProfile -Command "[Environment]::ProcessorCount"') do set CPU=%%A

echo Detected CPU cores: %CPU%
echo Target CPU load: 85%%
echo Duration: %DURATION% seconds
echo.
echo Starting CPU load...
echo Press CTRL+C to stop.
echo.

REM Start one worker per CPU core
for /L %%N in (1,1,%CPU%) do (
    start "" /b powershell -NoProfile -Command ^
    "$end=(Get-Date).AddSeconds(%DURATION%); while((Get-Date) -lt $end){for($i=0;$i -lt 850;$i++){[math]::Sqrt($i)}; Start-Sleep -Milliseconds 150}"
)

timeout /t %DURATION% /nobreak >nul

echo.
echo CPU load test completed.
pause
```
