export default () => {
	self.addEventListener('message', async e => { // eslint-disable-line no-restricted-globals
		if (!e) return;

        
		await new Promise(resolve => setTimeout(resolve, 3000));

		postMessage("sustenance");
	})
}
