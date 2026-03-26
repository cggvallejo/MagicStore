import urllib.request
import os

urls = {
    "stitched_home.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M2NGE4OTdjNDNmZTQwYzliYWVkN2Y3ZTI1MDc4YjkzEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086",
    "stitched_cart.html": "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FhZjEwZDI4ZDEwZjQwZDFiYzcxN2NkY2E3ZTljMjQxEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086",
    "stitched_catalog.html": "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzE3MmU3NWMwMjM4ZDRkN2FhYmY1YTk3MmY0M2VkNjhiEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086",
    "stitched_detail.html": "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FkNDMzYTZhMmJhZTRlNzA4MDg1NzA3OTI1NWUxMDgyEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086",
    "src/assets/profile_pic.jpg": "https://lh3.googleusercontent.com/aida/ADBb0uhzE5kIU3QzYWq5HBYVNRixrLR01yDxrXHMI_1AtvBV8DVHM8VjpipIUoPAAA2b_XW6ao6gS0qCeaKJkehGHSoMse3a0H2-Cn1Hz5OpxQF-ZETetBsg3XCwznoV0AnebfCmkggCDfuE2VhzNC2tvGAMMJKGoWPGQ01QDT9XpL2mieM0-vUmGhUxykLXR7iK6quYS7b2-JUAySZX4cUQN71tur1X_j-HngkuzF03GxKIfQwh47Ci1Xv9qCimcgQf4XcuPmm2xGvZrbk",
    "src/assets/12345.jpg": "https://lh3.googleusercontent.com/aida/ADBb0uiW8qIIZaluiYQ-q8RfX6VWi5ygeiU0wt9LKvuYSUHKbeaOKkNLoLvDsx0C_Y1NAIsnSY2xufmYVBFxVFW-lQbROK_x69K-mIH8sfnsYXRAnigf8YSZ3aSnciI0nl8ByfF9QhTtRgLqQYcXR30exoFB6_L9jhiy0rhzc2njRbnNyfMPv4P8YxsIfgSuPSovAoPbhs_WY_lFq8eudXA1w_zwmr_fUergKhTRS_a-ahW4J0DLXKyNbSJP8nWwzAFYlZwLg0tjI1UfK2g"
}

os.makedirs("src/assets", exist_ok=True)

for filename, url in urls.items():
    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, filename)
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
