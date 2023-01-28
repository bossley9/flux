export type Feed = {
	id: number
	user_id: number
	feed_url: string
	site_url: string
	title: string
	checked_at?: string
	etag_header?: string
	last_modified?: string
	parsing_error_message?: string
	parsing_error_count?: number
	disabled: boolean
	ignore_http_cache: boolean
	allow_self_signed_certificated: boolean
	fetch_via_proxy: boolean
	scraper_rules: string
	rewrite_rules: string
	blocklist_rules: string
	keeplist_rules: string
	crawler: boolean
	user_agent: string
	cookie: string
	username: string
	password: string
	category?: any // TODO category type
	hide_globally: boolean
}

