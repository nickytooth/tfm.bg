<?php
/**
 * TFM contact form handler (SuperHosting / Apache + Sendmail).
 * Receives the form POST and emails the inquiry to office@tfm.bg.
 * Returns JSON: { ok: true } or { ok: false, errors?: {...} }.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false]);
  exit;
}

// Honeypot: bots fill this hidden field -> pretend success, send nothing.
if (!empty(trim($_POST['company_website'] ?? ''))) {
  echo json_encode(['ok' => true]);
  exit;
}

$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$company  = trim($_POST['company'] ?? '');
$interest = trim($_POST['interest'] ?? '');
$message  = trim($_POST['message'] ?? '');
$consent  = ($_POST['consent'] ?? '') === 'on';

$errors = [];
if ($name === '') $errors['name'] = true;
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = true;
if (mb_strlen($message) < 10) $errors['message'] = true;
if (!$consent) $errors['consent'] = true;

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'errors' => $errors]);
  exit;
}

// --- Recipient + sender ---
$to = 'office@tfm.bg';
// Use an address on your own domain as the envelope sender (good for delivery).
$fromAddress = 'noreply@tfm.bg';

$subjectText = 'Ново запитване от ' . $name . ($company !== '' ? ' · ' . $company : '');
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$lines = [];
$lines[] = 'Име: ' . $name;
$lines[] = 'Имейл: ' . $email;
if ($company !== '')  $lines[] = 'Компания: ' . $company;
if ($interest !== '') $lines[] = 'Интерес: ' . $interest;
$lines[] = '';
$lines[] = $message;
$body = implode("\r\n", $lines);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: TFM =?UTF-8?B?' . base64_encode('сайт') . '?= <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . $email;
$headerStr = implode("\r\n", $headers);

// -f sets the envelope sender (helps avoid spam on shared hosting).
$sent = @mail($to, $subject, $body, $headerStr, '-f' . $fromAddress);

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false]);
}
