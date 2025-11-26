<script lang="ts">
	let user = {
		name: 'Juan Pérez',
		email: 'juan@example.com'
	};
</script>

<section class="p-6">
	<h1 class="text-2xl font-semibold mb-4">Perfil de usuario</h1>
	<div class="bg-white shadow-md rounded-xl p-4">
		<p><strong>Nombre:</strong> {user.name}</p>
		<p><strong>Email:</strong> {user.email}</p>
	</div>
</section>