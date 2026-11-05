<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

// Web Routes
Route::middleware(['throttle:global-web'])->group(function () {
    // Main Pages
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('/about', [PageController::class, 'about'])->name('about');
    Route::get('/sobre-rodrigo', [PageController::class, 'about']);
    Route::get('/servicios-drone', [PageController::class, 'drone'])->name('drone');
    Route::get('/game', [PageController::class, 'game'])->name('game');
    Route::get('/game/download', [PageController::class, 'downloadApk'])->name('game.download');
    Route::get('/card', [PageController::class, 'card'])->name('card');

    // Contact Form Endpoint (Fintech Rate-Limited & Protected)
    Route::post('/contacto', [ContactController::class, 'send'])
        ->middleware('throttle:contact-form')
        ->name('contact.send');

    // Sensus Deep Link & App Link Routes
    Route::get('/.well-known/assetlinks.json', function () {
        return response()->file(public_path('.well-known/assetlinks.json'), [
            'Content-Type' => 'application/json',
        ]);
    });

    Route::get('/sensus/reset', function () {
        return response()->file(public_path('sensus/reset/index.html'));
    });

    // Legacy Redirects
    Route::redirect('/enviar.php', '/', 301);
    Route::redirect('/index.php', '/', 301);
    Route::redirect('/about.php', '/about', 301);
    Route::redirect('/servicios-drone.php', '/servicios-drone', 301);
    Route::redirect('/game.php', '/game', 301);
    Route::redirect('/demo.php', '/', 301);
    Route::redirect('/demo', '/', 301);
    Route::redirect('/card.html', '/card', 301);
});
