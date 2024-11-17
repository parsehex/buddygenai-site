import type { SQLiteVal } from './types-db';

type AppSettingsKeys =
	| 'user_name'
	| 'chat_image_enabled'
	| 'chat_image_quality'
	| 'fresh_db'
	| 'n_gpu_layers'
	| 'auto_send_stt'
	| 'auto_read_chat'
	| 'auto_start_server'
	| 'skip_start_dialog';

export const AppSettingsDefaults: Record<string, SQLiteVal> = {
	user_name: 'User',
	chat_image_enabled: 0,
	chat_image_quality: 'medium',
	fresh_db: 0,
	n_gpu_layers: 99,
	auto_send_stt: 0,
	auto_read_chat: 0,
	auto_start_server: 0,
	skip_start_dialog: 0,
};

class AppSettingsCls {
	public isLoaded = false;

	constructor() {
		this.loadSettings();
	}

	private settings: Record<string, SQLiteVal> = JSON.parse(
		JSON.stringify(AppSettingsDefaults)
	);

	public get(key: AppSettingsKeys): SQLiteVal {
		return this.settings[key];
	}
	public set(key: AppSettingsKeys, value: string): void {
		if (value === undefined && this.settings[key]) return;
		this.settings[key] = value;
	}

	public getSettings(keys?: AppSettingsKeys[]): Record<string, SQLiteVal> {
		if (!keys?.length) return this.settings;
		return keys.reduce((acc, key) => {
			acc[key] = this.settings[key];
			return acc;
		}, {} as Record<string, SQLiteVal>);
	}

	private async loadSettings(): Promise<void> {
		this.isLoaded = true;
	}

	public async saveSettings(): Promise<void> {}
}

export const AppSettings = new AppSettingsCls();
