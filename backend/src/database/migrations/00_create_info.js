exports.up = function (knex) {
	return knex.schema.createTable('infos', table => {
		table.string('nome').primary().notNullable();
		table.string('chave').notNullable();
		table.integer('totalPorcoes').notNullable();
		table.string('quantidade').notNullable();
		table.string('ultimaPorcao').notNullable();
		table.string('status').notNullable();
	});
}

exports.down = function (knex) {
	return knex.schema.dropTable('infos');
}