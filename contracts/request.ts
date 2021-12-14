import Learning from "App/Models/Break/Learning";

declare module '@ioc:Adonis/Core/Request' {
	interface RequestContract {
		learning: Learning
	}
}
