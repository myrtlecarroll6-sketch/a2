$baseDir = "D:\antigravity website\knitfootprint"
$blogDir = "$baseDir\blog"
$imgDir = "$baseDir\images"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "    KNITFOOTPRINT - AUDIT REPORT         " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

$allFiles = Get-ChildItem -Path $baseDir -Recurse -File
Write-Host "Total Files: $($allFiles.Count)" -ForegroundColor Yellow

Write-Host "`n--- BLOG WORD COUNT AUDIT (Target: 1200+ words) ---" -ForegroundColor Cyan
$blogFiles = Get-ChildItem -Path $blogDir -Filter *.html
foreach ($b in $blogFiles) {
    $raw = Get-Content $b.FullName -Raw -Encoding UTF8
    $bodyMatch = [regex]::Match($raw, '<div class="article-body-knit">([\s\S]*?)</div>\s*</article>')
    $bodyContent = if ($bodyMatch.Success) { $bodyMatch.Groups[1].Value } else { $raw }
    $textOnly = [regex]::Replace($bodyContent, '<[^>]+>', ' ')
    $words = ($textOnly.Trim().Split([char[]]@(' ', "`t", "`n", "`r"), [StringSplitOptions]::RemoveEmptyEntries))
    $count = $words.Count
    if ($count -ge 1200) {
        Write-Host "  [PASS] $($b.Name) : $count words" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $($b.Name) : $count words (Under 1200 target!)" -ForegroundColor Red
    }
}

Write-Host "`n--- GOOGLE TAG AUDIT (G-0LY0HY7L01) ---" -ForegroundColor Cyan
$webPages = Get-ChildItem -Path $baseDir -Recurse -Include *.html, *.php
foreach ($p in $webPages) {
    $content = Get-Content $p.FullName -Raw -Encoding UTF8
    if ($content -match "G-0LY0HY7L01") {
        Write-Host "  [PASS] $($p.Name) contains Google Tag" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $($p.Name) MISSING Google Tag!" -ForegroundColor Red
    }
}

Write-Host "`n--- CONTACT DETAILS AUDIT (181 Mercer St & Phone) ---" -ForegroundColor Cyan
foreach ($p in $webPages) {
    $content = Get-Content $p.FullName -Raw -Encoding UTF8
    if ($content -match "181 Mercer Street" -and $content -match "888-777-5845") {
        Write-Host "  [PASS] $($p.Name) has complete contact details" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $($p.Name) MISSING contact details" -ForegroundColor Red
    }
}

Write-Host "`n--- IMAGE ASSETS AUDIT ---" -ForegroundColor Cyan
$imgs = Get-ChildItem -Path $imgDir -File
foreach ($i in $imgs) {
    Write-Host "  [OK] $($i.Name) ($($i.Length) bytes)" -ForegroundColor Green
}

Write-Host "`n--- STRICT EXCLUSIONS FILTER AUDIT ---" -ForegroundColor Cyan
$forbiddenRegex = "\b(finance|banking|loans?|investments?|crypto(currency)?|property|properties|real estate|condos?|villas?|wine|wines|alcohol|champagne|beer|beers|liquor|medicine|medicines|pharmacy|pharmaceuticals?|pills?)\b"
$violations = 0
foreach ($p in $webPages) {
    $content = Get-Content $p.FullName -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, $forbiddenRegex, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($matches.Count -gt 0) {
        foreach ($m in $matches) {
            Write-Host "  [ALERT] Forbidden term '$($m.Value)' found in $($p.Name)" -ForegroundColor Red
            $violations++
        }
    }
}
if ($violations -eq 0) {
    Write-Host "  [PASS] Clean! 0 forbidden niche terms found across all pages." -ForegroundColor Green
}

Write-Host "`n--- HOMEPAGE BLOG ABSENCE AUDIT ---" -ForegroundColor Cyan
$indexContent = Get-Content "$baseDir\index.php" -Raw -Encoding UTF8
if ($indexContent -notmatch "blog-knit-card" -and $indexContent -notmatch "the-science-of-merino-wool") {
    Write-Host "  [PASS] index.php has NO blog cards (Clean Homepage Structure)." -ForegroundColor Green
} else {
    Write-Host "  [FAIL] index.php contains blog cards!" -ForegroundColor Red
}

Write-Host "`n--- MOJIBAKE & ENCODING INTEGRITY AUDIT ---" -ForegroundColor Cyan
$mojibakePattern = "[ÂÃâ�]"
$mojibakeFound = 0
foreach ($p in $webPages) {
    $content = Get-Content $p.FullName -Raw -Encoding UTF8
    if ($content -match $mojibakePattern) {
        Write-Host "  [FAIL] Mojibake/encoding issue in $($p.Name)" -ForegroundColor Red
        $mojibakeFound++
    }
}
if ($mojibakeFound -eq 0) {
    Write-Host "  [PASS] Clean! 0 mojibake or corrupt encoding characters found." -ForegroundColor Green
}

Write-Host "`nKnitFootprint Audit Completed Successfully." -ForegroundColor Cyan
