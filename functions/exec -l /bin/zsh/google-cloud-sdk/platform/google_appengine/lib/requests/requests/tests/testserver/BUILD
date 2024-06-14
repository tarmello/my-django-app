load("//devtools/python/blaze:strict.bzl", "py_strict_library")

py_strict_library(
    name = "server",
    srcs = ["server.py"],
    visibility = ["//third_party/py/requests/tests:__pkg__"],
)

Fileset(
    name = "all_files",
    entries = [FilesetEntry(files = glob(["**"]))],
    visibility = ["//third_party/py/requests/tests:__pkg__"],
)
