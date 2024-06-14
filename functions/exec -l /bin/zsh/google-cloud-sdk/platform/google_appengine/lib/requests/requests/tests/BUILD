load("//devtools/python/blaze:strict.bzl", "py_strict_library")
load("//third_party/py/pytest:pytest_defs.bzl", "pytest_multi_tests")

py_strict_library(
    name = "compat",
    srcs = ["compat.py"],
    deps = ["//third_party/py/requests"],
)

py_strict_library(
    name = "utils",
    srcs = ["utils.py"],
)

pytest_multi_tests(
    name = "tests",
    srcs = [
        "conftest.py",
    ],
    env = {"PYTEST_PLUGINS": ",".join([
        "pytest_httpbin.plugin",
        "pytest_mock",
    ])},
    tags = [
        "requires-net:ipv4",
        "requires-net:loopback",
    ],
    tests = glob(["test_*.py"]),
    deps = [
        ":compat",
        ":utils",
        "//third_party/py/pytest_httpbin",
        "//third_party/py/pytest_mock",
        "//third_party/py/requests/tests/testserver:server",
        "//third_party/py/trustme",
    ],
)

Fileset(
    name = "all_files",
    entries = [
        FilesetEntry(files = glob(["**"])),
        FilesetEntry(
            srcdir = "//third_party/py/requests/tests/testserver:all_files",
            destdir = "testserver",
        ),
    ],
    visibility = ["//third_party/py/requests:__pkg__"],
)
