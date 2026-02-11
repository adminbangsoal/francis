import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "", {
  ignore_dnt: true,
});

let env_check = process.env.NODE_ENV === "production";

let actions = {
  identify: (id: string) => {
    if (env_check) mixpanel.identify(id);
  },
  track: (name: string, props?: any) => {
    if (env_check) mixpanel.track(name, props);
  },
};

export let Mixpanel = actions;
