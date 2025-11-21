var CoinFlipper = /** @class */ (function () {
    function CoinFlipper() {
        this.isFlipping = false;
        this.coin1 = document.getElementById("coin1");
        this.coin2 = document.getElementById("coin2");
        this.titleText = document.getElementById("title");
        this.flipButton = document.getElementById("flip");
        this.initialize();
    }
    CoinFlipper.prototype.initialize = function () {
        var _this = this;
        this.flipButton.addEventListener("click", function () { return _this.flip(); });
        this.coin1.addEventListener("click", function () { return _this.flip(); });
        this.coin2.addEventListener("click", function () { return _this.flip(); });
    };
    CoinFlipper.prototype.flip = function () {
        var _this = this;
        // Prevenir múltiples clics durante la animación
        if (this.isFlipping)
            return;
        this.isFlipping = true;
        var result = Math.random() > 0.5 ? "heads" : "tails";
        // Obtener moneda actualmente visible
        var currentVisibleCoin = this.coin1.classList.contains("hidden")
            ? this.coin2
            : this.coin1;
        // DECIDIR qué moneda mostrar basado en el resultado aleatorio
        var shouldShowHeads = result === "heads";
        var targetCoin = shouldShowHeads ? this.coin1 : this.coin2;
        var otherCoin = shouldShowHeads ? this.coin2 : this.coin1;
        this.titleText.textContent = result === "heads" ? "HEAD" : "TAIL";
        // Aplicar animación de salida a la moneda visible actual
        currentVisibleCoin.style.transition = "transform 0.6s , 0.6s";
        currentVisibleCoin.style.transform = "rotateY(720deg) scale(0.8)";
        // currentVisibleCoin.style.opacity = "0";
        setTimeout(function () {
            // Ocultar moneda actual y mostrar la nueva BASADO EN EL RESULTADO ALEATORIO
            currentVisibleCoin.classList.add("hidden");
            targetCoin.classList.remove("hidden");
            // Preparar y animar la nueva moneda
            targetCoin.style.transition = "transform 0.6s, 0.6s";
            targetCoin.style.transform = "rotateY(-720deg) scale(0.8)";
            // targetCoin.style.opacity = "0";
            // Forzar reflow para reiniciar la animación
            void targetCoin.offsetWidth;
            // Animar la entrada de la nueva moneda
            setTimeout(function () {
                targetCoin.style.transform = "rotateY(720deg) scale(1)";
                targetCoin.style.opacity = "1";
                // Reiniciar estado de la moneda que salió
                currentVisibleCoin.style.transform = "rotateY(720deg) scale(1)";
                currentVisibleCoin.style.opacity = "1";
                _this.isFlipping = false;
                // Opcional: Mostrar el resultado en consola para debug
                console.log("Resultado: ".concat(result));
            }, 50);
        }, 600);
    };
    return CoinFlipper;
}());
// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    new CoinFlipper();
});
