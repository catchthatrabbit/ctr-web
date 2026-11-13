<script lang="ts">
	import { page } from '$app/state';
	import Portal from '#lib/ctr/Portal.svelte';
	const path = $derived(page.url.pathname);
</script>
<Portal {path} />
