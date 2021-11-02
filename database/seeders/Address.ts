import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Mongo/Address'
import { Address as AddressData, CityContract } from 'nik-validate'
export default class AddressSeeder extends BaseSeeder {
	public async run() {
		// Write your database queries inside the run method
		await Address.collection.drop()
		const a = [...AddressData.provinces, ...AddressData.cities]
		await Promise.all(
			a.map(async (address: CityContract) => {
				await Address.create({
					name: address.name,
					type: address.province_id ? 'city' : null,
					parent_id: address.province_id,
					_id: address.id,
				})
			})
		)
	}
}
