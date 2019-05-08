workflow "New workflow" {
  on = "push"
  resolves = ["cat-event"]
}

action "show-env" {
  uses = "actions/action-builder/shell@master"
  runs = "env"
}

action "cat-event" {
  uses = "actions/action-builder/shell@master"
  runs = "cat"
  needs = ["show-env"]
  args = "$(GITHUB_EVENT_PATH)"
}
