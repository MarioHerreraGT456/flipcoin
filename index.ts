type CoinSide = "heads" | "tails";

class CoinFlipper {
  private coin1: HTMLImageElement;
  private coin2: HTMLImageElement;
  private flipButton: HTMLButtonElement;
  private isFlipping: boolean = false;

  constructor() {
    this.coin1 = document.getElementById("coin1") as HTMLImageElement;
    this.coin2 = document.getElementById("coin2") as HTMLImageElement;
    this.flipButton = document.getElementById("flip") as HTMLButtonElement;

    this.initialize();
  }

  private initialize(): void {
    this.flipButton.addEventListener("click", () => this.flip());
    this.coin1.addEventListener("click", () => this.flip());
    this.coin2.addEventListener("click", () => this.flip());
  }

  // private flip(): void {
  //   // Prevenir múltiples clics durante la animación
  //   if (this.isFlipping) return;

  //   this.isFlipping = true;
  //   const result: CoinSide = Math.random() > 0.5 ? "heads" : "tails";
  //   // DECIDIR qué moneda mostrar basado en el resultado aleatorio
  //   const shouldShowHeads = result === "heads";

  //   // Obtener moneda actualmente visible
  //   const currentVisibleCoin = this.coin1.classList.contains("hidden")
  //     ? this.coin2
  //     : this.coin1;
  //   const currentHiddenCoin = this.coin1.classList.contains("hidden")
  //     ? this.coin1
  //     : this.coin2;

  //   // Aplicar animación de salida a la moneda visible
  //   currentVisibleCoin.style.transition =
  //     "transform 0.6s ease-in-out,  0.6s ease-in-out";
  //   currentVisibleCoin.style.transform = "rotateY(720deg) scale(0.8)";
  //   // currentVisibleCoin.style.opacity = "0";

  //   setTimeout((): void => {
  //     // Ocultar moneda actual y mostrar la nueva
  //     currentVisibleCoin.classList.add("hidden");
  //     currentHiddenCoin.classList.remove("hidden");

  //     // Preparar y animar la nueva moneda
  //     currentHiddenCoin.style.transition =
  //       "transform 0.6s ease-in-out, 0.6s ease-in-out";
  //     currentHiddenCoin.style.transform = "rotateY(-720deg) scale(0.8)";
  //     // currentHiddenCoin.style.opacity = "0";

  //     // Forzar reflow para reiniciar la animación
  //     void currentHiddenCoin.offsetWidth;

  //     // Animar la entrada de la nueva moneda
  //     setTimeout((): void => {
  //       currentHiddenCoin.style.transform = "rotateY(0deg) scale(1)";
  //       currentHiddenCoin.style.opacity = "1";

  //       // Reiniciar estado de la moneda que salió
  //       currentVisibleCoin.style.transform = "rotateY(0deg) scale(1)";
  //       currentVisibleCoin.style.opacity = "1";

  //       this.isFlipping = false;
  //     }, 50);
  //   }, 600);
  // }
  private flip(): void {
    // Prevenir múltiples clics durante la animación
    if (this.isFlipping) return;

    this.isFlipping = true;
    const result: CoinSide = Math.random() > 0.5 ? "heads" : "tails";

    // Obtener moneda actualmente visible
    const currentVisibleCoin = this.coin1.classList.contains("hidden")
      ? this.coin2
      : this.coin1;

    // DECIDIR qué moneda mostrar basado en el resultado aleatorio
    const shouldShowHeads = result === "heads";
    const targetCoin = shouldShowHeads ? this.coin1 : this.coin2;
    const otherCoin = shouldShowHeads ? this.coin2 : this.coin1;

    // Si ya está mostrando la moneda correcta, no hacer animación de cambio
    // if (currentVisibleCoin === targetCoin) {
    //   // Aplicar animación de "rebote" para indicar que giró pero salió lo mismo
    //   currentVisibleCoin.style.transition = "transform 0.6s , 0.6s";
    //   currentVisibleCoin.style.transform = "rotateY(720deg) scale(1.1)";

    //   setTimeout((): void => {
    //     currentVisibleCoin.style.transform = "scale(1)";
    //     this.isFlipping = false;
    //   }, 600);
    //   return;
    // }

    // Aplicar animación de salida a la moneda visible actual
    currentVisibleCoin.style.transition = "transform 0.6s , 0.6s";
    currentVisibleCoin.style.transform = "rotateY(720deg) scale(0.8)";
    // currentVisibleCoin.style.opacity = "0";

    setTimeout((): void => {
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
      setTimeout((): void => {
        targetCoin.style.transform = "rotateY(720deg) scale(1)";
        targetCoin.style.opacity = "1";

        // Reiniciar estado de la moneda que salió
        currentVisibleCoin.style.transform = "rotateY(720deg) scale(1)";
        currentVisibleCoin.style.opacity = "1";

        this.isFlipping = false;

        // Opcional: Mostrar el resultado en consola para debug
        console.log(`Resultado: ${result}`);
      }, 50);
    }, 600);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new CoinFlipper();
});
