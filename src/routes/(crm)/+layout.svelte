<script lang="ts">
	let { children } = $props();
</script>

<div class="flex min-h-screen bg-gray-100">

	<aside class="w-64 bg-white shadow-lg p-6">
		<h1 class="text-xl font-semibold mb-8">MB Smart CRM</h1>

		<nav class="space-y-2">
			<a href="/crm/dashboard" class="block p-2 rounded hover:bg-blue-100">Dashboard</a>
			<a href="/crm/clientes" class="block p-2 rounded hover:bg-blue-100">Clients</a>
			<a href="/crm/tickets" class="block p-2 rounded hover:bg-blue-100">Tickets</a>
			<a href="/crm/agentes" class="block p-2 rounded hover:bg-blue-100">Agents</a>
		</nav>
		<form method="POST" action="/login">
    <button
        class="mt-8 text-red-600 hover:underline"
        type="submit"
    >
        Logout
    </button>
</form>

	</aside>

	<main class="flex-1 p-8">
		{@render children()}
	</main>

</div>
