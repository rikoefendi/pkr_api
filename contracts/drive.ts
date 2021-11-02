declare module '@ioc:Adonis/Core/Drive' {
	interface DisksList {
		local: {
			config: LocalDriverConfig
			implementation: LocalDriverContract
		}
		gcs: {
			config: GcsDriverConfig
			implementation: GcsDriverContract
		}
	}
}
