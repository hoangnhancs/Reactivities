import { makeAutoObservable } from "mobx";

export class ProfileCardStore {
    profile: Profile | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile(profileDate: Profile) {
        this.profile = profileDate;
    }

    toggleFollow() {
        if (!this.profile) return;
        this.profile.following = !this.profile.following;
        this.profile.followersCount =
        (this.profile.followersCount || 0) + (this.profile.following ? 1 : -1);
    }
}
