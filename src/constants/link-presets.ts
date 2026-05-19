import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import {
	type Locale,
	LinkPreset,
	type NavBarLink,
} from "@/types/config";
import { getAboutUrl, getArchiveUrl, getFriendLinkUrl, getHomeUrl } from "@/utils/url-utils";

export function getLinkPresets(locale: Locale): { [key in LinkPreset]: NavBarLink } {
	return {
		[LinkPreset.Home]: {
			name: i18n(locale, I18nKey.home),
			url: getHomeUrl(locale),
		},
		[LinkPreset.About]: {
			name: i18n(locale, I18nKey.about),
			url: getAboutUrl(locale),
		},
		[LinkPreset.Archive]: {
			name: i18n(locale, I18nKey.archive),
			url: getArchiveUrl(locale),
		},
		[LinkPreset.FriendLink]: {
			name: i18n(locale, I18nKey.friendLink),
			url: getFriendLinkUrl(locale),
			external: false,
		},
	};
}
