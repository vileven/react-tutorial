const STATE = {
	PENDING: 0,
	EXECUTED: 1,
	REJECTED: 2,
};

class Promise1 {

	constructor(fun) {
		this.state = STATE.PENDING;
		this.value = null;
		this.handlers = [];

		this.processResolve(fun);
	}

	handle({onExecuted, onRejected}) {
		switch (this.state) {
			case (STATE.PENDING):
				this.handlers.push({onExecuted, onRejected});
				break;
			case (STATE.EXECUTED):
				onExecuted(this.value);
				break;
			case (STATE.REJECTED):
				onRejected(this.value);
				break;
		}
	}

	execute(result) {
		this.state = STATE.EXECUTED;
		this.value = result;
		this.handlers.forEach(this.handle.bind(this));
		this.handlers = null;
	}

	reject(error) {
		this.state = STATE.REJECTED;
		this.value = error;
		this.handlers.forEach(this.handle.bind(this));
		this.handlers = null;
	}

	processResolve(fun) {
		let done = false;

		try {
			fun(
				(value) =>  {
					done = true;
					this.execute(value);
				},
				(value) => {
					done = true;
					this.reject(value);
				}
			)
		} catch (e) {
			if (done) {
				return;
			}
			done = true;
			this.reject(e);
		}
	}

	resolve(result) {
		try {
			const then = result.then;

			if (then && typeof then === 'function') {
				this.processResolve(then.bind(result))
			}

			this.execute(result);
		} catch (error) {
			this.reject(error);
		}
	}

	done(onExecuted, onRejected) {
		setTimeout(() => this.handle({onExecuted, onRejected}), 0);
	}

	then(onExecuted, onRejected) {
		return new Promise1((resolve, reject) => {
			return this.done(
				(result) => {
					if (typeof onExecuted === 'function') {
						try {
							return resolve(onExecuted(result));
						} catch (e) {
							reject(e);
						}
					} else {
						resolve(result);
					}
				},

				(error) => {
					if (typeof onRejected === 'function') {
						try {
							return resolve(onRejected(error));
						} catch (e) {
							reject(e);
						}
					} else {
						reject(error);
					}
				}
			);
		})
	}
}

new Promise1((resolve, reject) => setTimeout(() => {
	console.log('kek');
	resolve();
}, 300)).then(() => console.log('lol'));


