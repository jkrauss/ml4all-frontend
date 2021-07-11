<!-- making table smaler on biger screens -->
<div class="md:w-10/12 w-full">
	<table class="w-full">
		<caption><slot name="caption" /></caption>
		<thead class="border-b border-black">
			<slot name="head" />
		</thead>
		<tbody class="">
			<slot />
		</tbody>
		<tfoot>
			<slot name="foot" />
		</tfoot>
	</table>
</div>
