
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/login" | "/logout" | "/profile" | "/requisition" | "/requisition/list" | "/requisition/new" | "/requisition/preview" | "/requisition/[id]";
		RouteParams(): {
			"/requisition/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/login": Record<string, never>;
			"/logout": Record<string, never>;
			"/profile": Record<string, never>;
			"/requisition": { id?: string };
			"/requisition/list": Record<string, never>;
			"/requisition/new": Record<string, never>;
			"/requisition/preview": Record<string, never>;
			"/requisition/[id]": { id: string }
		};
		Pathname(): "/" | "/login" | "/login/" | "/logout" | "/logout/" | "/profile" | "/profile/" | "/requisition" | "/requisition/" | "/requisition/list" | "/requisition/list/" | "/requisition/new" | "/requisition/new/" | "/requisition/preview" | "/requisition/preview/" | `/requisition/${string}` & {} | `/requisition/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/logo.png" | string & {};
	}
}