<script>
	let email = "";
	let password = "";
</script>

<div class="min-h-screen flex">
		<h1 class="text-4xl font-bold text-[#1E73BE] absolute top-8 left-8">
			MB Smart
		</h1>
	<div
		class="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center"
		style="background-image: url('/MB Smart logo.png');"
	>

	</div>

	<div class="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

		<form method="POST" action="/login" class="w-full max-w-sm bg-white p-8 shadow-lg rounded-xl">
			
			<h1 class="text-2xl font-semibold text-center mb-6">Login</h1>

			<div class="space-y-4">
				
				<div>
					<label for="email" class="block text-sm mb-1">Email</label>
					<input
						id="email"
						name="email"
						bind:value={email}
						type="text"
						class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm mb-1">Password</label>
					<input
						id="password"
						name="password"
						bind:value={password}
						type="password"
						class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
				>
					Login
				</button>
			</div>

		</form>

	</div>
</div>
