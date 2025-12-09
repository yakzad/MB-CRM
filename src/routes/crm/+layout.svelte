<script lang="ts">
  export let data;
  import "../../app.css";
</script>


<div class="flex min-h-screen bg-gray-100">
  <aside class="w-64 bg-white shadow-lg p-6">
    <h1 class="text-xl font-semibold mb-8">MB Smart CRM</h1>

  <nav class="space-y-2">
    <a href="/crm/dashboard" class="block p-2 rounded hover:bg-blue-100">Dashboard</a>
    <a href="/crm/clients" class="block p-2 rounded hover:bg-blue-100">Clients</a>
    <a href="/crm/tickets" class="block p-2 rounded hover:bg-blue-100">Tickets</a>
    <a href="/crm/agents" class="block p-2 rounded hover:bg-blue-100">Agents</a>
  </nav>



    <hr class="my-4 border-gray-300/40" />

    <form method="POST" action="/logout">
      <button
        class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition"
      >
        Logout
      </button>
    </form>

  </aside>

  <main class="flex-1 p-8">
    <slot />
  </main>
</div>

{#if data.authenticated}
  <!-- nothing -->
{/if}
