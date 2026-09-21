export function loadRazorpayScript():
  Promise<void> {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      if (
        window.Razorpay
      ) {
        resolve();

        return;
      }

      const existing =
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );

      if (existing) {
        existing.addEventListener(
          "load",
          () => resolve()
        );

        existing.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "Unable to load Razorpay checkout."
              )
            )
        );

        return;
      }

      const script =
        document.createElement(
          "script"
        );

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload =
        () => resolve();

      script.onerror =
        () =>
          reject(
            new Error(
              "Unable to load Razorpay checkout."
            )
          );

      document.body.appendChild(
        script
      );
    }
  );
}