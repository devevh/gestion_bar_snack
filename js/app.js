// enregistrement du service worker 
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./gestion_bar_snack/js/sw.js').then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
else {
	console.log('le navigateur ne supporte pas le serviceWorker');
}

//gestion de l'installation
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
//masquer le boutoin d'installation avant que les conditions ne soient satisfaites
addBtn.style.display = 'none';

//gestion de l'évènement d'installation déclenché par le navigateur
window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	addBtn.style.display = 'block';

	addBtn.addEventListener('click', () => {
		// hide our user interface that shows our A2HS button
		addBtn.style.display = 'none';
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
				//demande acceptée on ne demandera plus donc plus besoin de stocker l'évènement beforeinstallprompt
				deferredPrompt = null;
			} else {
				console.log('User dismissed the A2HS prompt');
			}
		});
	});
});